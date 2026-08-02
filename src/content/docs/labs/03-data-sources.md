---
title: Lab 03. Data Source와 참조 / Data Sources
description: Compare read-only data sources with managed resources and inspect the dependency edges created by references.
---

| Level | Time | Objectives |
|---|---:|---|
| Beginner | 35-50 min | 4a-4b |

**Read first:** [Configuration 4a-4b](/domains/04-configuration/#4a-4b-resource-data-and-references)

## Outcome

AWS AMI와 availability zone을 data source로 읽고 managed resource argument에서 참조합니다. “조회한다”와 “lifecycle을 관리한다”의 차이를 plan에서 구분합니다.

:::caution[Cost boundary]
Download solution에는 EC2 resource가 있습니다. Data source 학습만 필요하면 `terraform plan`까지만 수행하세요. Apply하면 compute 비용이 발생할 수 있습니다.
:::

## Prepare

1. [Lab 03 downloads](/guide/labs-and-practice/#lab-03)을 disposable directory에 저장합니다.
2. Region에서 default VPC와 해당 instance type이 사용 가능한지 확인합니다.
3. AMI owner, architecture, name filter가 너무 넓지 않은지 읽습니다.

## Execute and inspect

```bash
terraform init
terraform validate
terraform plan -out=tfplan
terraform show tfplan
```

Plan에서 다음을 구분합니다.

- `data.aws_ami.ubuntu`: existing information read
- `data.aws_availability_zones.available`: provider API result
- `aws_instance.web`: managed lifecycle proposal
- `data.aws_ami.ubuntu.id` reference: value flow와 implicit dependency

`most_recent = true` 결과는 시간이 지나면 바뀔 수 있습니다. 같은 configuration이 새 AMI를 선택할 때 plan에 어떤 change가 나타날지 설명합니다.

## Verify and cleanup

- Apply하지 않았다면 remote cleanup은 필요하지 않으며 saved plan만 제거합니다.
- Apply했다면 `terraform state list`, `terraform state show aws_instance.web`을 확인한 뒤 즉시 destroy합니다.
- Data source는 state에 일부 read result가 기록될 수 있지만 remote object lifecycle을 소유하지 않습니다.

**Detailed walkthrough:** [Historical Lab 03](/archive/labs/lab-03-data-sources/readme/)  
**Next:** [Lab 04 count and for_each](/labs/04-count-for-each/) · [Official data sources](https://developer.hashicorp.com/terraform/language/v1.12.x/data-sources)
