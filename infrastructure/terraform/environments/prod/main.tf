module "s3_assets" {
  source = "../../modules/s3"

  bucket_name     = "agorapp-assets-${var.environment}"
  environment     = var.environment
  allowed_origins = ["https://${var.domain_name}", "https://*.${var.domain_name}"]
}

module "acm_certificate" {
  source = "../../modules/acm"

  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  environment               = var.environment
  route53_zone_id           = var.route53_zone_id
}

module "cloudfront_distribution" {
  source = "../../modules/cloudfront"

  s3_bucket_domain_name = module.s3_assets.bucket_domain_name
  s3_bucket_name        = module.s3_assets.bucket_id
  s3_bucket_id          = module.s3_assets.bucket_id
  s3_bucket_arn         = module.s3_assets.bucket_arn
  environment           = var.environment
  domain_aliases        = ["assets.${var.domain_name}"]
  acm_certificate_arn   = module.acm_certificate.certificate_arn
  price_class           = var.cloudfront_price_class
}

# Create a DNS record for the assets subdomain
resource "aws_route53_record" "assets_subdomain" {
  zone_id = var.route53_zone_id
  name    = "assets.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.cloudfront_distribution.cloudfront_distribution_domain_name
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront's hosted zone ID, which is always this value
    evaluate_target_health = false
  }
}

# Output important values
output "s3_bucket_name" {
  value = module.s3_assets.bucket_id
}

output "cloudfront_distribution_domain" {
  value = module.cloudfront_distribution.cloudfront_distribution_domain_name
}

output "assets_domain" {
  value = "assets.${var.domain_name}"
}
