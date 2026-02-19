<script>
  const { originalText = '', modifiedText = '', onProcessing = () => {} } = $props();

  $effect(() => {
    onProcessing({ computeTime: 1, cleanupTime: 2 }, [
      { operation: 0, text: originalText },
      { operation: 1, text: modifiedText }
    ]);
  });
</script>

<div data-testid="svelte-dmp-props">{originalText}|||{modifiedText}</div>
