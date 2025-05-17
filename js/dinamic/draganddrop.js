class DragAndDropUploader {
  constructor(containerSelector, inputSelector) {
    this.container = document.querySelector(containerSelector);
    this.input = document.querySelector(inputSelector);
    this.dragArea = this.container.querySelector(".drag-area");
    this.button = this.container.querySelector("button.drag-btn");
    this.dragText = this.dragArea.querySelector("header.title-drag");
    this.imagenesCargadas = [];

    this.init();
  }

  init() {
    this.button.onclick = () => this.input.click(); // Click en el botón
    this.input.addEventListener("change", (e) =>
      this.handleFiles(e.target.files)
    );
    this.dragArea.addEventListener("dragover", (e) => this.handleDragOver(e));
    this.dragArea.addEventListener("dragleave", () => this.handleDragLeave());
    this.dragArea.addEventListener("drop", (e) => this.handleDrop(e));

    // Delegación de eventos para eliminar imágenes
    this.container.addEventListener("click", (e) => {
      if (e.target.classList.contains("eliminar-imagen")) {
        this.eliminarImagen(e.target.dataset.index);
      }
    });
  }

  handleDragOver(event) {
    event.preventDefault();
    this.dragArea.classList.add("active");
    this.dragText.textContent = "Suelta para subir la imagen";
  }

  handleDragLeave() {
    this.dragArea.classList.remove("active");
    this.dragText.textContent = "Arrastra y suelta la imagen aquí";
  }

  handleDrop(event) {
    event.preventDefault();
    this.handleFiles(event.dataTransfer.files);
  }

  handleFiles(files) {
    if (!this.dragArea.classList.contains("list-imagens")) {
      this.dragArea.classList.add("list-imagens");
    }

    for (let file of files) {
      this.mostrarImagen(file);
    }
  }

  mostrarImagen(file) {
    const reader = new FileReader();
    const index = this.imagenesCargadas.length;

    reader.onload = (e) => {
      if (this.imagenesCargadas.length === 0) {
        this.dragArea.innerHTML = "";
      }

      const template = `
          <div class="image-card">
              <img src="${e.target.result}" alt="">
              <span class="eliminar-imagen" data-index="${index}">&times;</span>
          </div>
        `;

      this.dragArea.insertAdjacentHTML("beforeend", template);
      this.imagenesCargadas.push(file);
    };

    reader.readAsDataURL(file);
  }

  eliminarImagen(index) {
    this.imagenesCargadas.splice(index, 1);
    this.dragArea
      .querySelector(`.eliminar-imagen[data-index="${index}"]`)
      .parentElement.remove();

    if (this.imagenesCargadas.length === 0) {
      this.resetDragArea();
    }
  }

  reset() {
    // Vaciar el array de imágenes cargadas
    this.imagenesCargadas = [];

    // Restaurar la interfaz a su estado inicial
    this.dragArea.innerHTML = `
        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <header class="title-drag">Drag & Drop to Upload File</header>
        <span>OR</span>
    `;

    // Remover la clase de lista de imágenes si estaba agregada
    this.dragArea.classList.remove("list-imagens");
  }
}
