# S3 Bucket 리소스
resource "aws_s3_bucket" "my_first_bucket" {
  # 버킷 이름은 전 세계적으로 고유해야 합니다
  # YOUR_INITIALS를 본인 이니셜로 변경하세요
  bucket = "terraform-lab-01-bucket-YOUR_INITIALS-20260720"

  tags = {
    Name        = "My First Terraform Bucket"
    Environment = "Learning"
  }
}

# Bucket Versioning 활성화
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.my_first_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Bucket Encryption 설정 (Best Practice)
resource "aws_s3_bucket_server_side_encryption_configuration" "encryption" {
  bucket = aws_s3_bucket.my_first_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Public Access Block (보안 강화)
resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.my_first_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
