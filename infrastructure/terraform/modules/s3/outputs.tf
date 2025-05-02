output "bucket_id" {
  description = "The ID of the S3 bucket"
  value       = aws_s3_bucket.assets_bucket.id
}

output "bucket_arn" {
  description = "The ARN of the S3 bucket"
  value       = aws_s3_bucket.assets_bucket.arn
}

output "bucket_domain_name" {
  description = "The domain name of the S3 bucket"
  value       = aws_s3_bucket.assets_bucket.bucket_regional_domain_name
}

output "s3_access_policy_arn" {
  description = "The ARN of the IAM policy for S3 access"
  value       = aws_iam_policy.s3_access_policy.arn
}
