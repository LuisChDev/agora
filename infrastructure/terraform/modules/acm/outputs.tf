output "certificate_arn" {
  description = "The ARN of the certificate"
  value       = aws_acm_certificate.cert.arn
}

output "certificate_domain_name" {
  description = "The domain name of the certificate"
  value       = aws_acm_certificate.cert.domain_name
}

output "certificate_validation_domains" {
  description = "List of domain validation options"
  value       = aws_acm_certificate.cert.domain_validation_options
}

