output "ami_id" {
  description = "ID of the Ubuntu AMI used"
  value       = data.aws_ami.ubuntu.id
}

output "ami_name" {
  description = "Name of the Ubuntu AMI"
  value       = data.aws_ami.ubuntu.name
}

output "ami_description" {
  description = "Description of the AMI"
  value       = data.aws_ami.ubuntu.description
}

output "instance_id" {
  description = "ID of the created instance"
  value       = aws_instance.web.id
}

output "instance_public_ip" {
  description = "Public IP of the instance"
  value       = aws_instance.web.public_ip
}

output "available_azs" {
  description = "List of available AZs"
  value       = data.aws_availability_zones.available.names
}

output "default_vpc_id" {
  description = "Default VPC ID"
  value       = data.aws_vpc.default.id
}
