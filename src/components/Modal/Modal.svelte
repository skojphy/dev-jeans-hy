<script>
  export let showModal // boolean
  import close from '../../assets/close.svg'

  let dialog // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()}>
  <div on:click|stopPropagation>
    <slot name="header" />
    <slot />
    <!-- svelte-ignore a11y-autofocus -->
    <button class="close" autofocus on:click={() => dialog.close()} aria-label="닫기">
      <img src={close} aria-hidden alt="닫기" />
    </button>
  </div>
</dialog>

<style>
  dialog {
    border-radius: 0.2em;
    border: none;
    padding: 0;
    position: absolute;
    width: 100%;
    max-width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 20px;
  }
  button {
    display: block;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
</style>
