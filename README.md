# project-ecr-ecs-frontend

HTML/CSS/JS frontend — Nginx container pe serve hota hai, AWS ECS Fargate pe deploy hota hai.

## Tech
- HTML + CSS + Vanilla JS
- Nginx (container server)
- Docker → AWS ECR → AWS ECS Fargate
- GitHub Actions + OIDC (no static AWS keys)

## Local development

```bash
# Direct browser mein open karo
open src/index.html

# Ya Docker se
docker build -t ecr-ecs-frontend .
docker run -p 8080:80 ecr-ecs-frontend
# http://localhost:8080
```

## Pipeline flow

```
develop branch push
      │
      ▼
Docker Build → ECR Push (dev-<sha> tag)
      │
      ▼
Infra repo trigger → TF Init → TF Plan → TF Apply
      │
      ▼
https://shabaz.mytitan.in
```

## Branch → Environment mapping

| Branch    | Environment | Approval |
|-----------|-------------|----------|
| develop   | DEV         | Auto     |
| staging   | UAT         | Required |
| main      | PRODUCTION  | Required |

## GitHub Secrets required

```
DEV_IAM_ROLE_ARN    = arn:aws:iam::ACCOUNT:role/ecr-ecs-github-actions-dev
UAT_IAM_ROLE_ARN    = arn:aws:iam::ACCOUNT:role/ecr-ecs-github-actions-uat
PROD_IAM_ROLE_ARN   = arn:aws:iam::ACCOUNT:role/ecr-ecs-github-actions-production
INFRA_DEPLOY_TOKEN  = GitHub PAT (infra repo trigger ke liye)
```

## GitHub Variables required

```
AWS_REGION = ap-south-1
```
