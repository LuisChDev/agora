variable "domain_name" {
  description = "Primary domain name for the certificate"
  type        = string
}

variable "subject_alternative_names" {
  description = "List of alternative domain names for the certificate"
  type        = list(string)
  default     = []
}

variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  type        = string
}

variable "route53_zone_id" {
  description = "ID of the Route53 hosted zone for DNS validation"
  type        = string
}
