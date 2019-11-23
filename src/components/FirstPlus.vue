<template>
    <div class="timeline_pro_update">
        <div class="timeline_pro_update_center">
            <span class="timeline_pro_update_center_line"></span>
            <span class="timeline_pro_update_center_new is-static"  @click="$emit('onDraft')">
            </span>
        </div>
        <div class="timeline_pro_update_right">
            <p style="margin-top: 7px; margin-bottom: 0; font-weight: bold; font-size: 1.1em;">Add a new update</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'firstPlus'
}
</script>

<style>

</style>