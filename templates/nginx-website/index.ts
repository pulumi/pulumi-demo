import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const config = new pulumi.Config();
const appName = config.require("name");

const ns = new k8s.core.v1.Namespace(appName, {
    metadata: { name: appName },
});

const configMap = new k8s.core.v1.ConfigMap(appName, {
    metadata: {
        namespace: ns.metadata.name,
    },
    data: {
        "index.html": "<html><body><h1>Hello, Pulumi!</h1></body></html>",
    },
});

const deployment = new k8s.apps.v1.Deployment(appName, {
    metadata: {
        namespace: ns.metadata.name
    },
    spec: {
        selector: { matchLabels: { app: appName } },
        replicas: 3,
        template: {
            metadata: { labels: { app: appName } },
            spec: {
                containers: [{
                    name: appName,
                    image: appName,
                    ports: [{ containerPort: 80 }],
                    volumeMounts: [{ name: "nginx-index", mountPath: "/usr/share/nginx/html/" + appName }],
                }],
                volumes: [{
                    name: "nginx-index",
                    configMap: { name: configMap.metadata.name },
                }],
            },
        },
    },
});

const service = new k8s.core.v1.Service(appName, {
    metadata: {
        name: appName,
        namespace: ns.metadata.name
    },
    spec: {
        selector: { app: appName },
        ports: [{ port: 80, targetPort: 80 }],
    },
});

const ingressClass = new k8s.networking.v1.IngressClass("alb", {
    metadata: {
        namespace: ns.metadata.name,
        labels: {
            "app.kubernetes.io/name": "LoadBalancerController",
        },
        name: "alb",
    },
    spec: {
        controller: "eks.amazonaws.com/alb",
    }
});

const ingress = new k8s.networking.v1.Ingress(appName, {
    metadata: {
        namespace: ns.metadata.name,
        // Annotations for EKS Auto Mode to identify the Ingress as internet-facing and target-type as IP.
        annotations: {
            "alb.ingress.kubernetes.io/scheme": "internet-facing",
            "alb.ingress.kubernetes.io/target-type": "ip",
        }
    },
    spec: {
        ingressClassName: ingressClass.metadata.name,
        rules: [{
            http: {
                paths: [{
                    path: "/" + appName,
                    pathType: "Prefix",
                    backend: {
                        service: {
                            name: service.metadata.name,
                            port: {
                                number: 80,
                            },
                        },
                    },
                }],
            },
        }],
    }
});
