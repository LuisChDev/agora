terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # backend "s3" {
  #   bucket         = "agorapp-terraform-state"
  #   key            = "terraform.tfstate"
  #   region         = "us-east-1"  # Change as needed
  #   dynamodb_table = "agorapp-terraform-locks"  # For state locking
  # }
}

provider "aws" {
  region = "us-east-1"
}
