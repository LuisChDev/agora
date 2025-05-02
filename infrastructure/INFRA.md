# Terraform Infrastructure Management for Agorapp

This directory contains Terraform configurations to manage the AWS infrastructure for the Agorapp application. The infrastructure is defined as code, allowing for version control, consistent deployments, and easy creation of multiple environments.

## Infrastructure Components

The Terraform configuration manages the following AWS resources:

- **S3 Buckets**: For storing user-uploaded content and other assets
- **CloudFront Distribution**: For global content delivery with HTTPS
- **ACM Certificates**: For securing the application with SSL/TLS
- **Route53 DNS Records**: For domain management

## Project Structure

```
infrastructure/
├── terraform/
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── prod/
│   ├── modules/
│   │   ├── s3/
│   │   ├── cloudfront/
│   │   └── acm/
│   └── backend.tf
└── scripts/
    └── deploy.sh
```

- **environments/**: Contains environment-specific configurations
- **modules/**: Reusable Terraform modules for different AWS services
- **backend.tf**: Configures the Terraform backend for state management
- **scripts/**: Helper scripts for deployment and management

## Prerequisites

1. [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or newer)
2. [AWS CLI](https://aws.amazon.com/cli/) installed and configured
3. AWS credentials with appropriate permissions

## Getting Started

### Initial Setup

1. **Configure AWS credentials**:
   ```bash
   aws configure
   ```

2. **Create an S3 bucket for Terraform state** (optional but recommended):
   ```bash
   aws s3 mb s3://agorapp-terraform-state
   ```

3. **Create a DynamoDB table for state locking** (optional but recommended):
   ```bash
   aws dynamodb create-table \
     --table-name agorapp-terraform-locks \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST
   ```

4. **Uncomment and configure the backend section** in `backend.tf` if you created the S3 bucket and DynamoDB table.

### Deployment

You can deploy the infrastructure using the included script:

```bash
./scripts/deploy.sh dev plan    # Preview changes for dev environment
./scripts/deploy.sh dev apply   # Apply changes to dev environment
./scripts/deploy.sh prod apply  # Apply changes to production environment
```

Or manually with Terraform commands:

```bash
cd infrastructure/terraform/environments/dev
terraform init
terraform plan
terraform apply
```

### CI/CD Integration

A GitHub Actions workflow is included in `.github/workflows/terraform.yml` that can automatically plan, apply, or destroy infrastructure based on changes to the Terraform files.

## Environment Configuration

Each environment (dev, staging, prod) has its own configuration:

1. **Variables File**: `terraform.tfvars` contains environment-specific values
2. **Main Configuration**: `main.tf` defines the resources to be created
3. **Variable Definitions**: `variables.tf` declares the variables used

### Variables to Configure

Each environment requires the following variables:

- `domain_name`: Your application's domain name (e.g., "agorapp.com")
- `route53_zone_id`: The ID of your Route53 hosted zone
- `cloudfront_price_class`: Determines CloudFront's distribution range

## Adding New Resources

To add new AWS resources:

1. Create a new module in the `modules/` directory
2. Include the module in the appropriate environment configurations
3. Add necessary variables to the environment's `variables.tf` and `terraform.tfvars` files

## Common Tasks

### Creating a New Environment

To create a new environment (e.g., "staging"):

1. Copy an existing environment directory:
   ```bash
   cp -r infrastructure/terraform/environments/dev infrastructure/terraform/environments/staging
   ```

2. Update the `terraform.tfvars` file with environment-specific values.

### Updating Existing Infrastructure

1. Make changes to the relevant Terraform files
2. Run the deployment script:
   ```bash
   ./scripts/deploy.sh <environment> plan  # Review changes
   ./scripts/deploy.sh <environment> apply # Apply changes
   ```

### Managing State

Terraform state is vital for tracking your infrastructure. If you're using an S3 backend:

1. State is stored in the S3 bucket specified in `backend.tf`
2. State locking uses the DynamoDB table to prevent concurrent modifications
3. State files should never be manually edited

## Integration with Vercel

Since your application is hosted on Vercel, you'll need to configure it to use the AWS resources:

1. Set environment variables in your Vercel project:
   ```
   AWS_S3_BUCKET_NAME=agorapp-assets-prod
   AWS_CLOUDFRONT_DOMAIN=assets.agorapp.com
   ```

2. Update your application code to use these environment variables for asset URLs

## Security Considerations

1. **IAM Roles**: Use specific IAM roles for different services
2. **S3 Bucket Policies**: The CloudFront distribution has an Origin Access Identity (OAI) to access S3
3. **Access Keys**: Store AWS access keys securely as GitHub secrets

## Troubleshooting

1. **State Issues**: If Terraform state becomes out of sync:
   ```bash
   terraform refresh
   ```

2. **Permission Errors**: Check IAM permissions for the deployed AWS credentials

3. **Resource Dependencies**: Use `terraform graph` to visualize resource dependencies

## Best Practices

1. **Version Control**: Commit all Terraform files except sensitive data
2. **Code Reviews**: Review infrastructure changes before applying
3. **Workspaces**: For advanced users, consider using Terraform workspaces instead of directory-based environments
4. **Testing**: Test infrastructure changes in a non-production environment first
5. **Documentation**: Keep this README updated with any infrastructure changes
