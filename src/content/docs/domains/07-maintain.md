---
title: 07. 인프라 유지보수 / Maintain Infrastructure
description: "Objectives 7a-7c: import, state inspection, and verbose logging."
---

## 7a. Import existing infrastructure

Import connects an existing remote object to a Terraform resource address. It does not automatically guarantee that your configuration matches every remote argument.

```hcl
import {
  to = aws_s3_bucket.logs
  id = "existing-log-bucket"
}

resource "aws_s3_bucket" "logs" {
  bucket = "existing-log-bucket"
}
```

구성 기반 `import` block은 plan에서 검토 가능한 workflow를 제공합니다. CLI `terraform import ADDRESS ID`도 알아야 하지만, import 후 반드시 plan을 실행해 configuration과 remote object의 차이를 확인합니다.

## 7b. Inspect state safely

```bash
terraform state list
terraform state show 'aws_s3_bucket.logs'
terraform show
terraform output
```

- `state list`: addresses in state
- `state show`: attributes for one bound resource instance
- `show`: human-readable state or plan
- `output`: root module output values

Quote addresses containing brackets or string keys so the shell does not reinterpret them.

## 7c. Verbose logging

```bash
export TF_LOG=DEBUG
export TF_LOG_PATH=./terraform-debug.log
terraform plan
unset TF_LOG TF_LOG_PATH
```

Use logs to diagnose initialization, provider communication, graph evaluation, and remote API failures. Logs can contain credentials or sensitive values, so scope collection, protect files, and remove them after diagnosis.

## Troubleshooting order

1. Read the diagnostic and identify Core, provider, backend, or remote API ownership.
2. Run `terraform fmt` and `terraform validate` for configuration issues.
3. Confirm versions, credentials, network, and backend access.
4. Reproduce with the smallest command and enable the least verbose useful log level.
5. Compare state, plan, and remote reality before changing bindings.

## 다음 연결 / Why next

로컬 운영 패턴을 팀과 원격 실행으로 확장하면 [HCP Terraform](/domains/08-hcp-terraform/)의 workspace, project, policy가 필요합니다.

**Official sources:** [Import](https://developer.hashicorp.com/terraform/language/v1.12.x/import), [State command](https://developer.hashicorp.com/terraform/cli/v1.12.x/commands/state), [Debugging](https://developer.hashicorp.com/terraform/internals/v1.12.x/debugging)<br />
**Lab:** [Lab 10 State operations](/labs/10-state-operations/)<br />
**Questions:** [Domain 7 bank](/archive/practice-exams/domain-7-maintain/)
