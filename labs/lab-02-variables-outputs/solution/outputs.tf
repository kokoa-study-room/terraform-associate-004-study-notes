output "bucket_name" {
  description = "Full bucket name"
  value       = aws_s3_bucket.app_bucket.id
}

output "bucket_arn" {
  description = "Bucket ARN"
  value       = aws_s3_bucket.app_bucket.arn
}

output "bucket_region" {
  description = "Bucket region"
  value       = aws_s3_bucket.app_bucket.region
}

output "environment" {
  description = "Deployment environment"
  value       = var.environment
}

output "versioning_enabled" {
  description = "Is versioning enabled"
  value       = var.enable_versioning
}

output "all_tags" {
  description = "All applied tags"
  value       = aws_s3_bucket.app_bucket.tags_all
}
