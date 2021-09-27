<template>
<table class="table table-sm table-borderless">
    <tbody>
        <tr v-for="(log, index) in logs" :log="log" :key="index">
            <td>
                <span :class="`log-indicator align-middle border-theme-1`" />
            </td>
            <td>
                <span class="font-weight-medium">{{ log.food__category__name[$lang] }}</span>
            </td>
            <td class="text-right">
                <span class="text-muted">{{ log.count }}</span>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: ['logs']
}
</script>
