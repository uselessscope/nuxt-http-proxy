<script setup lang="ts">
import { useFetch } from '#imports'

const { data } = await useFetch<{ status: string }>('http://localhost:3000/api/mocks')
</script>

<template>
  <div>
    {{ data.status }}
  </div>
</template>
