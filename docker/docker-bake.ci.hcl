variable "TURBO_TEAM" {}
group "default" {
  targets = ["status-hub-local"]
}

target "docker-metadata-action" {}

target "ci" {
  inherits = ["docker-metadata-action"]
  secret = [
    "type=env,id=TURBO_TOKEN"
  ]
  args = {
    TURBO_TEAM = "${TURBO_TEAM}"
  }
}

target "status-hub-local" {
  inherits = ["ci"]
  context = "."
  dockerfile = "docker/aio.Dockerfile"
  tags=[
    "status-hub-local:latest"
  ]
}

target "backend-local" {
  inherits = ["ci"]
  context = "."
  dockerfile = "packages/backend/Dockerfile"
  tags=[
    "status-hub-backend-local:latest"
  ]
}

target "frontend-local" {
  inherits = ["ci"]
  context = "."
  dockerfile = "packages/frontend/Dockerfile"
  tags=[
    "status-hub-frontend-local:latest"
  ]
}