<script>
  export let text = ''
  export let icon = '💡'
  export let style = ''
</script>

<div class="noti" {style}>{icon} {text}</div>

<style>
  .noti {
    background-color: #ecf0f3;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 6px;
    color: #666;
    font-size: 14px;
  }
</style>
