---
title: 05. Terraform 모듈 / Modules
description: "Objectives 5a-5d: module sources, scope, use, and version management."
---

## Module as a contract

모든 Terraform configuration은 module입니다. 명령을 실행하는 디렉터리는 **root module**, `module` block으로 호출되는 구성은 **child module**입니다. 좋은 module은 input, managed resources, output의 경계를 분명히 합니다.

Every Terraform configuration is a module. The working directory is the root module; configuration called by a `module` block is a child module.

## 5a. Sources

```hcl
module "network" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.21.0"
}
```

Sources include local paths, public/private registry addresses, Git, and other supported package sources. Registry modules support the `version` argument; non-registry sources typically pin a revision in the source URL.

## 5b. Scope

- Child module은 parent의 local value나 resource를 자동으로 볼 수 없습니다.
- Inputs enter through variables; results leave through outputs.
- Resource names are scoped to their module address.
- Provider configurations should normally be passed from the root module.

## 5c. Composition

```hcl
module "network" {
  source = "./modules/network"
  cidr   = var.network_cidr
}

module "app" {
  source    = "./modules/app"
  subnet_id = module.network.private_subnet_id
}
```

`module.network.private_subnet_id`는 데이터 전달과 module 간 dependency를 함께 만듭니다. Prefer small composable modules over a single module that owns unrelated lifecycle boundaries.

## 5d. Versions

Module version constraints control acceptable registry releases. Pin deliberately, test upgrades through plan, and avoid unconstrained production dependencies. `terraform init -upgrade` asks Terraform to reconsider selections within configured constraints.

## 다음 연결 / Why next

Module 경계를 바꾸면 resource address도 바뀔 수 있습니다. 안전한 리팩터링을 위해 [state와 moved/removed block](/domains/06-state/)을 이해해야 합니다.

**Official sources:** [Modules overview](https://developer.hashicorp.com/terraform/language/v1.12.x/modules), [Module configuration](https://developer.hashicorp.com/terraform/language/v1.12.x/modules/configuration), [Composition](https://developer.hashicorp.com/terraform/language/v1.12.x/modules/develop/composition)  
**Labs:** [Create a module](/archive/labs/lab-05-first-module/readme/), [Registry module](/archive/labs/lab-11-module-registry/readme/)
