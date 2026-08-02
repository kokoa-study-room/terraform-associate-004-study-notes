---
title: 08. HCP Terraform
description: "Objectives 8a-8d: remote execution, collaboration, governance, workspaces, projects, and integrations."
---

## Local workflow, managed execution

HCP Terraform keeps the Terraform workflow while centralizing state, runs, credentials, collaboration, and governance. A workspace is an execution and state boundary; a project groups workspaces for organization and access control.

HCP Terraform은 Terraform 언어를 대체하지 않습니다. It provides a managed operating environment around plans and applies.

## 8a. Create infrastructure

```hcl
terraform {
  cloud {
    organization = "example-org"

    workspaces {
      name = "production-network"
    }
  }
}
```

Know CLI-driven, VCS-driven, and API-driven workflows. Runs can execute remotely with workspace variables and dynamic provider credentials rather than long-lived local credentials.

## 8b. Collaboration and governance

| Capability | Purpose |
|---|---|
| Teams and permissions | 최소 권한과 승인 경계 / access and approval boundaries |
| Private registry | 조직 module/provider 공유 / governed reuse |
| Policy enforcement | plan을 정책으로 평가 / evaluate plans against policy |
| Health assessments | drift and continuous validation signals |
| Explorer/change requests | cross-workspace visibility and coordinated changes |

Features and plan availability evolve; distinguish exam concepts from current subscription details.

## 8c. Workspaces and projects

- **Workspace:** configuration association, state, variables, run history, execution settings.
- **Project:** related workspace grouping and access boundary.
- **Run trigger:** upstream workspace completion can queue a downstream run.
- **Variable set:** reusable variables attached across workspace/project scope.

CLI workspaces and HCP Terraform workspaces share a name but are not interchangeable concepts. CLI workspaces are multiple state instances for one working directory; HCP workspaces are full managed execution units.

## 8d. Integration

`terraform login` obtains an API token, `cloud` configuration connects the working directory, and migration moves state into HCP Terraform. VCS integrations trigger runs from repository changes; dynamic credentials avoid storing long-lived cloud secrets.

## 종합 확인 / Final checkpoint

You should now be able to trace one change from HCL expression, through graph and plan, through provider execution, into state, and finally into an HCP Terraform run and governance decision.

**Official sources:** [HCP Terraform](https://developer.hashicorp.com/terraform/cloud-docs), [Workspaces](https://developer.hashicorp.com/terraform/cloud-docs/workspaces), [Projects](https://developer.hashicorp.com/terraform/cloud-docs/projects), [CLI integration](https://developer.hashicorp.com/terraform/cli/v1.12.x/cloud)  
**Lab:** [HCP Terraform workflow](/archive/labs/lab-12-hcp-terraform/readme/)
