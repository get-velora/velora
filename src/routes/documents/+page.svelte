<script lang="ts">
  import { Plus, File, Trash2, ChevronLeft, ChevronRight } from 'lucide-svelte';
  // Persistence for documents
  import { loadStore, saveStore, type DocumentsStore } from '$lib/persist';

  // Initialize documents from storage
  let docs = $state<DocumentsStore>(loadStore('documents', [
    { id: '1', title: 'Personal Statement', content: '' },
    { id: '2', title: 'Supplemental Essay', content: '' }
  ]));

  // Initialize active document id
  let activeId = $state(docs[0]?.id || '1');
  let showSidebar = $state(true);

  // Save documents whenever they change
  $effect(() => {
    saveStore('documents', docs);
  });

  let activeDoc = $derived(docs.find(d => d.id === activeId) || docs[0]);
  let wordCount = $derived(activeDoc.content.trim() ? activeDoc.content.trim().split(/\s+/).length : 0);

  function addFile() {
    const id = Math.random().toString(36).substring(2, 9);
    docs = [...docs, { id, title: 'Untitled Document', content: '' }];
    activeId = id;
  }

  function deleteFile(id: string, e: MouseEvent) {
    e.stopPropagation();
    if (docs.length > 1) {
      docs = docs.filter(d => d.id !== id);
      if (activeId === id) activeId = docs[0].id;
    }
  }

  function updateContent(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const index = docs.findIndex(d => d.id === activeId);
    if (index !== -1) docs[index].content = target.value;
  }

  function updateTitle(e: Event) {
    const target = e.target as HTMLInputElement;
    const index = docs.findIndex(d => d.id === activeId);
    if (index !== -1) docs[index].title = target.value;
  }
</script>

<div class="flex h-screen w-full bg-black text-white font-arial antialiased overflow-hidden">
  
  <!-- Sidebar -->
  <aside 
    class="h-full border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
    class:w-72={showSidebar}
    class:w-0={!showSidebar}
    class:border-none={!showSidebar}
  >
    <div class="w-72 flex flex-col h-full">
      <div class="p-8 flex justify-between items-center">
        <span class="text-sm font-normal text-white/40 font-arial">Documents</span>
        <button onclick={addFile} class="text-white/40 hover:text-white transition-colors p-1">
          <Plus size={20} strokeWidth={2} />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-4 space-y-1">
        {#each docs as doc}
          <button 
            onclick={() => activeId = doc.id}
            class="w-full text-left px-4 py-3 rounded flex items-center justify-between group transition-all
            {activeId === doc.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white hover:bg-white/5'}"
          >
            <div class="flex items-center gap-3 truncate">
              <File size={16} strokeWidth={1.5} />
              <span class="text-[14px] truncate font-arial">{doc.title}</span>
            </div>
            {#if docs.length > 1}
              <button 
                onclick={(e) => deleteFile(doc.id, e)}
                class="opacity-0 group-hover:opacity-100 text-white/20 hover:text-white transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            {/if}
          </button>
        {/each}
      </nav>
    </div>
  </aside>

  <!-- Main Editor Area -->
  <main class="flex-1 flex flex-col min-w-0 relative">
    
    <!-- Top Navigation -->
    <header class="h-20 flex items-center justify-between px-8">
      <!-- Chevron Toggle: Size 28 -->
      <button 
        onclick={() => showSidebar = !showSidebar} 
        class="text-white/40 hover:text-white transition-colors"
      >
        {#if showSidebar}
          <ChevronLeft size={28} strokeWidth={1.5} />
        {:else}
          <ChevronRight size={28} strokeWidth={1.5} />
        {/if}
      </button>
      
      <!-- Header Font Size: 20px -->
      <input 
        type="text" 
        value={activeDoc.title}
        oninput={updateTitle}
        class="bg-transparent text-center text-[20px] font-normal focus:outline-none text-white w-full max-w-xl px-4 font-arial"
        spellcheck="false"
      />

      <div class="w-[28px]"></div>
    </header>

    <!-- Editor -->
    <div class="flex-1 overflow-y-auto w-full flex justify-center">
      <div class="w-full max-w-3xl px-12 py-12">
        <!-- Placeholder: white/20 (Dim White) -->
        <textarea
          value={activeDoc.content}
          oninput={updateContent}
          placeholder="Begin writing..."
          spellcheck="true"
          class="w-full h-full bg-transparent resize-none focus:outline-none text-white leading-relaxed text-[20px] font-arial placeholder:text-white/20"
        ></textarea>
      </div>
    </div>

    <!-- Status Bar -->
    <footer class="h-16 flex items-center px-12 border-t border-white/5 text-[13px] text-white/30 font-arial">
      <div class="flex gap-8">
        <span>Words: {wordCount}</span>
        <span>Characters: {activeDoc.content.length}</span>
      </div>
    </footer>
  </main>
</div>

<style>
  :global(body) {
    background-color: #000;
    margin: 0;
  }

  .font-arial {
    font-family: Arial, Helvetica, sans-serif !important;
  }

  textarea {
    field-sizing: content;
    min-height: 70vh;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
  }

  button:focus {
    outline: none;
  }
</style>