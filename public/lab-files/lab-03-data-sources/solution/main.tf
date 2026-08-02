resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name            = "Web Server"
    AMI             = data.aws_ami.ubuntu.name
    AMI_Description = data.aws_ami.ubuntu.description
    AZ              = data.aws_availability_zones.available.names[0]
  }
}
