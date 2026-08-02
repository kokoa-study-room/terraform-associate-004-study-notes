---
title: Lab 12. HCP Terraform Remote Run
description: Run a no-cloud-cost Terraform configuration in HCP Terraform and distinguish service, workspace, and provider authentication boundaries.
---

| Level | Time | Objectives |
|---|---:|---|
| Advanced | 60-90 min | 8a-8d |

**Read first:** [HCP Terraform](/domains/08-hcp-terraform/), [HCP responsibility boundaries](/reference/hcp-boundaries/)

## Outcome

Cloud credential 없이 `random_pet` resource를 사용하는 CLI-driven remote run을 수행합니다. HCP workspace가 state, variables, run history, execution setting을 격리한다는 점을 확인합니다.

## Safe configuration

```hcl
terraform {
  required_version = ">= 1.12.0, < 1.13.0"

  cloud {
    organization = "YOUR_ORGANIZATION"
    workspaces {
      name = "associate-004-lab-12"
    }
  }

  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

resource "random_pet" "example" {
  length = 2
}

output "name" {
  value = random_pet.example.id
}
```

## Authenticate and run

```bash
terraform login
terraform init
terraform plan
terraform apply
```

1. CLI token은 CLI-to-HCP authentication이며 provider credential이 아님을 확인합니다.
2. Local terminal에 stream되는 output과 HCP run page의 plan을 비교합니다.
3. Workspace state와 run history를 확인합니다.
4. Project를 만들고 workspace를 이동해도 state가 다른 workspace와 합쳐지지 않는지 확인합니다.

## Extend without static secrets

Cloud provider experiment가 필요하면 long-lived access key를 workspace variable에 복사하는 방식보다 HCP Terraform의 dynamic provider credentials를 사용합니다. OIDC trust와 target-cloud role은 official provider-specific guide에 따라 별도 구성합니다.

VCS-driven workflow를 추가로 비교할 때는 이 repository가 아니라 disposable infrastructure repository를 연결하고, pull request plan과 apply approval boundary를 관찰합니다.

## Verification and cleanup

- CLI, HCP service, target provider의 세 authentication boundary를 설명합니다.
- Workspace와 project의 책임 차이를 설명합니다.
- Policy, run task, health assessment의 목적을 구분합니다.
- `terraform destroy`를 remote run으로 완료한 뒤 disposable workspace와 token을 정리합니다.

**Historical note:** [Old Lab 12](/archive/labs/lab-12-hcp-terraform/readme/)의 static AWS key 절차는 사용하지 마세요.  
**Official:** [Dynamic provider credentials](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/dynamic-provider-credentials) · [CLI-driven runs](https://developer.hashicorp.com/terraform/cloud-docs/run/cli)  
**Next:** [Exam readiness](/review/exam-readiness/) · [HCP questions](/archive/practice-exams/domain-8-hcp-terraform/)
