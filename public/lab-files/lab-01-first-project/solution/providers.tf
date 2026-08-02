terraform {
  required_version = ">= 1.12.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  # 선택: 기본 태그를 모든 리소스에 적용
  default_tags {
    tags = {
      Project   = "Terraform-Associate-Lab"
      Lab       = "Lab-01"
      ManagedBy = "Terraform"
    }
  }
}
