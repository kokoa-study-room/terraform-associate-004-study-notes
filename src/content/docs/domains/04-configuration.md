---
title: 04. Terraform 구성 / Configuration
description: "Objectives 4a-4h: blocks, references, values, types, expressions, dependencies, validation, and sensitive data."
---

## Configuration is a typed dependency graph

HCL을 단순 텍스트 템플릿으로 보지 마세요. Block은 객체를 선언하고, expression은 값을 계산하며, reference는 dependency를 만들고, type constraint와 condition은 입력과 결과의 계약을 강화합니다.

Do not treat HCL as text templating. Blocks declare constructs, expressions compute values, references create dependencies, and types and conditions enforce contracts.

## 4a-4b. Resource, data, and references

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
}
```

`resource`는 lifecycle을 관리하고 `data`는 정보를 읽습니다. `data.aws_ami.ubuntu.id` 참조는 값 전달과 dependency edge를 동시에 만듭니다.

## 4c-4e. Values, types, expressions

```hcl
variable "services" {
  type = map(object({
    port    = number
    enabled = optional(bool, true)
  }))
}

locals {
  enabled_services = {
    for name, service in var.services : name => service
    if service.enabled
  }
}

output "service_names" {
  value = keys(local.enabled_services)
}
```

- Primitive: `string`, `number`, `bool`
- Collection: `list(T)`, `set(T)`, `map(T)`
- Structural: `object({...})`, `tuple([...])`
- `for`, splat, conditional, and built-in functions transform values; they do not generate arbitrary HCL text.

## 4f. Dependencies

암시적 dependency가 우선입니다. `depends_on`은 참조할 값은 없지만 behavior상 선행되어야 하는 경우에만 추가합니다. 과도한 명시적 dependency는 unknown values와 보수적인 plan을 늘릴 수 있습니다.

## 4g. Validation layers

| Mechanism | Best fit |
|---|---|
| Variable `validation` | 입력 자체의 유효성 |
| `precondition` | resource/data/output 동작 전 가정 |
| `postcondition` | 적용 또는 읽기 후 보장 |
| `check` block | 지속적 assertion; failure is generally a warning, not apply blocking |

## 4h. Sensitive data

`sensitive = true`는 표시를 가리지만 state 저장을 자동 방지하지 않습니다. Secure the backend, limit access, avoid hard-coded credentials, prefer dynamic credentials, and use ephemeral/write-only capabilities only in supported contexts.

Vault와 같은 secrets manager를 사용하면 Terraform configuration에 장기 비밀을 하드코딩하지 않고 필요한 시점에 값을 조회할 수 있습니다. 그러나 provider가 읽은 secret은 사용 방식에 따라 state나 plan에 남을 수 있으므로, Vault 사용 자체를 비저장의 보장으로 오해하지 말고 schema의 ephemeral/write-only 지원과 state 접근 통제를 함께 확인해야 합니다.

Vault and other secrets managers avoid hard-coding long-lived secrets in configuration. They do not automatically guarantee that a consumed value is absent from plan or state; verify provider schema behavior, use ephemeral or write-only paths where supported, and secure state access.

## 다음 연결 / Why next

구성의 input/output 계약을 재사용 가능한 경계로 묶으면 [module](/domains/05-modules/)이 됩니다.

**Official sources:** [Resources](https://developer.hashicorp.com/terraform/language/v1.12.x/resources), [Values](https://developer.hashicorp.com/terraform/language/v1.12.x/values), [Functions](https://developer.hashicorp.com/terraform/language/v1.12.x/functions), [Validate](https://developer.hashicorp.com/terraform/language/v1.12.x/validate), [Sensitive data](https://developer.hashicorp.com/terraform/language/v1.12.x/manage-sensitive-data)<br />
**Labs:** [02 Variables/outputs](/labs/02-variables-outputs/), [03 Data sources](/labs/03-data-sources/), [04 count/for_each](/labs/04-count-for-each/), [07 Lifecycle](/labs/07-lifecycle/), [08 Conditions](/labs/08-custom-conditions/), [09 Dynamic blocks](/labs/09-dynamic-blocks/)<br />
**Questions:** [Domain 4 bank](/archive/practice-exams/domain-4-configuration/)
