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
  region = "ap-northeast-2"
}

resource "aws_s3_bucket" "example" {
  bucket = "terraform-hello-world-koa"

  tags = {
    Name        = "Hello World"
    Environment = "Learning"
  }
}
