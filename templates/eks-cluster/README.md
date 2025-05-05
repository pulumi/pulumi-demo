# Amazon EKS Cluster Template

This template provides a production-ready Amazon Elastic Kubernetes Service (EKS) cluster infrastructure using Pulumi. It sets up a highly available, secure, and scalable Kubernetes environment in AWS.

## 🚀 Features

- **High Availability**: Multi-AZ deployment across multiple availability zones
- **Security Best Practices**:
  - IAM roles and policies for cluster access
  - Security groups for node groups
  - Encrypted EBS volumes
  - VPC with private subnets
- **Scalability**:
  - Auto-scaling node groups
  - Configurable instance types
  - Flexible node group configurations
- **Networking**:
  - VPC with public and private subnets
  - NAT Gateways for outbound internet access
  - Configurable CIDR ranges
- **Monitoring & Logging**:
  - CloudWatch integration
  - Container insights enabled
  - Logging for control plane components

## 📋 Prerequisites

- AWS CLI configured with appropriate credentials
- Pulumi CLI installed
- kubectl installed
- AWS IAM permissions for EKS cluster creation
- Python 3.7+ (if using Python SDK)

## 🛠️ Configuration

The template can be configured through Pulumi configuration. Key configuration options include:

```yaml
config:
  aws:region: us-west-2
  eks:clusterName: my-eks-cluster
```

## 🚀 Deployment

1. Clone this template:
   ```bash
   git clone <repository-url>
   cd eks-cluster
   ```

2. Initialize a new Pulumi stack:
   ```bash
   pulumi stack init dev
   ```

3. Configure your stack:
   ```bash
   pulumi config set aws:region us-west-2
   pulumi config set eks:clusterName my-eks-cluster
   ```

4. Deploy the stack:
   ```bash
   pulumi up
   ```

5. Configure kubectl:
   ```bash
   aws eks update-kubeconfig --name my-eks-cluster --region us-west-2
   ```

## 🔧 Customization

You can customize various aspects of the cluster:

- Node group configurations
- VPC settings
- Security group rules
- IAM roles and policies
- Kubernetes add-ons

## 🔍 Monitoring and Maintenance

- Use CloudWatch for monitoring cluster metrics
- Enable Container Insights for detailed container metrics
- Regularly update the EKS control plane version
- Monitor node group health and scaling events

## 🧹 Cleanup

To destroy all resources:

```bash
pulumi destroy
```

## 📚 Additional Resources

- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Pulumi EKS Documentation](https://www.pulumi.com/registry/packages/aws/api-docs/eks/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


