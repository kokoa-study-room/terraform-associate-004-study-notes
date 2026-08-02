output "bucket_id" {
  description = "The name of the bucket"
  value       = aws_s3_bucket.my_first_bucket.id
}

output "bucket_arn" {
  description = "The ARN of the bucket"
  value       = aws_s3_bucket.my_first_bucket.arn
}

output "bucket_region" {
  description = "The AWS region this bucket resides in"
  value       = aws_s3_bucket.my_first_bucket.region
}

output "bucket_domain_name" {
  description = "The bucket domain name"
  value       = aws_s3_bucket.my_first_bucket.bucket_domain_name
}

output "versioning_status" {
  description = "The versioning status of the bucket"
  value       = aws_s3_bucket_versioning.versioning.versioning_configuration[0].status
}
