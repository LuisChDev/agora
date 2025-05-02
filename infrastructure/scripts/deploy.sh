#!/bin/bash

# Exit on error
set -e

# Check if environment is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <environment> [plan|apply|destroy]"
  echo "Example: $0 dev plan"
  exit 1
fi

ENVIRONMENT=$1
ACTION=${2:-apply}  # Default action is apply
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_DIR="$SCRIPT_DIR/../terraform/environments/$ENVIRONMENT"

# Check if the environment directory exists
if [ ! -d "$ENV_DIR" ]; then
  echo "Error: Environment '$ENVIRONMENT' not found."
  echo "Available environments:"
  ls -1 "$SCRIPT_DIR/../terraform/environments"
  exit 1
fi

# Navigate to the environment directory
cd "$ENV_DIR"

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Format Terraform files (optional)
echo "Formatting Terraform files..."
terraform fmt -recursive

# Validate Terraform files
echo "Validating Terraform files..."
terraform validate

# Perform the requested action
case "$ACTION" in
  plan)
    echo "Planning deployment for $ENVIRONMENT environment..."
    terraform plan -out=tfplan
    ;;
  apply)
    echo "Applying deployment for $ENVIRONMENT environment..."
    terraform apply -auto-approve
    ;;
  destroy)
    echo "WARNING: You are about to destroy all resources in the $ENVIRONMENT environment!"
    read -p "Are you sure you want to continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      terraform destroy -auto-approve
    else
      echo "Destroy operation cancelled."
      exit 0
    fi
    ;;
  *)
    echo "Error: Invalid action '$ACTION'. Use 'plan', 'apply', or 'destroy'."
    exit 1
    ;;
esac

echo "Operation completed successfully!"
