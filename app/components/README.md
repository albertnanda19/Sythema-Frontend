# Components Directory

This directory will contain reusable Vue components.

## Structure Guidelines

- Keep components focused and single-purpose
- Use TypeScript with `<script setup lang="ts">`
- Ensure all components are SSR-safe by default
- Use `.client.vue` suffix for client-only components
- Use `.server.vue` suffix for server-only components

## Naming Convention

- Use PascalCase for component names
- Be descriptive and specific
- Group related components in subdirectories

## Examples

```
components/
├── Button.vue
├── Input.vue
├── Card.vue
├── project/
│   ├── ProjectCard.vue
│   └── ProjectList.vue
└── session/
    ├── SessionLog.vue
    └── SessionDetail.vue
```

## Not Implemented Yet

Components will be created as needed during feature implementation.
