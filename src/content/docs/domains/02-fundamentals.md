---
title: 02. Terraform 기초 / Fundamentals
description: "Objectives 2a-2d: providers, versions, multiple providers, and state."
---

## 세 구성 요소 / Three cooperating parts

1. **Terraform Core** parses configuration, builds the dependency graph, creates plans, and coordinates apply.
2. **Providers** expose resource/data-source schemas and call remote APIs.
3. **State** binds Terraform addresses such as `aws_instance.web` to remote object identities and metadata.

Core가 “무엇이 필요한가”를 계산하고, provider가 “API로 어떻게 수행하는가”를 구현하며, state가 “어떤 실제 객체를 이미 관리하는가”를 기억합니다.

## 2a-2b. Provider source and version

```hcl
terraform {
  required_version = "~> 1.12.0"

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
```

- `required_providers` declares source addresses and acceptable versions.
- `provider` blocks configure a selected provider instance.
- `terraform init` installs providers and updates `.terraform.lock.hcl` selections.
- Commit the dependency lock file for reproducible provider installation.

## 2c. Multiple providers and aliases

```hcl
provider "aws" {
  region = "ap-northeast-2"
}

provider "aws" {
  alias  = "dr"
  region = "ap-southeast-1"
}

resource "aws_s3_bucket" "replica" {
  provider = aws.dr
  bucket   = "example-replica-bucket"
}
```

Alias는 다른 region/account 구성을 명시적으로 선택합니다. Child module은 provider configuration을 자체 정의하기보다 호출자로부터 전달받는 설계를 우선합니다.

## 2d. State is a mapping, not configuration

State는 HCL의 복사본이 아닙니다. 주소, remote ID, 속성 snapshot, dependency metadata를 저장합니다. State 손상이나 유출은 인프라 관리와 비밀 보호에 직접 영향을 주므로 직접 편집하지 말고 backend와 CLI를 사용합니다.

State is not a copy of HCL. It stores bindings, remote identifiers, snapshots, and metadata. Use supported backends and CLI operations rather than manual editing.

## 다음 연결 / Why next

Provider와 state가 준비되는 과정을 실제 명령 순서로 이해하려면 [Core workflow](/domains/03-workflow/)로 이동합니다.

**Official sources:** [Providers](https://developer.hashicorp.com/terraform/language/v1.12.x/providers), [Provider requirements](https://developer.hashicorp.com/terraform/language/v1.12.x/providers/requirements), [Lock file](https://developer.hashicorp.com/terraform/language/v1.12.x/files/dependency-lock), [State purpose](https://developer.hashicorp.com/terraform/language/v1.12.x/state/purpose)  
**Lab:** [Lab 01](/archive/labs/lab-01-first-project/readme/)
