class FlowchartMaker {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.selectedTool = 'select';
        this.selectedShape = null;
        this.shapes = [];
        this.connections = [];
        this.isDragging = false;
        this.isResizing = false;
        this.isConnecting = false;
        this.dragOffset = { x: 0, y: 0 };
        this.connectionStart = null;
        this.shapeCounter = 0;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTools();
        this.setupProperties();
        this.setupFileHandling();
    }

    setupEventListeners() {
        // Canvas events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        
        // Document events
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    setupTools() {
        // Shape tools
        document.querySelectorAll('.tool-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tool-item').forEach(t => t.classList.remove('active'));
                item.classList.add('active');
                this.selectedTool = item.dataset.shape;
            });
        });

        // Drawing tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedTool = btn.id.replace('Tool', '');
            });
        });
    }

    setupProperties() {
        const fillColor = document.getElementById('fillColor');
        const borderColor = document.getElementById('borderColor');
        const borderWidth = document.getElementById('borderWidth');
        const borderWidthValue = document.getElementById('borderWidthValue');
        const shapeText = document.getElementById('shapeText');

        borderWidth.addEventListener('input', () => {
            borderWidthValue.textContent = borderWidth.value;
            this.updateSelectedShapeProperties();
        });

        [fillColor, borderColor, borderWidth, shapeText].forEach(input => {
            input.addEventListener('change', this.updateSelectedShapeProperties.bind(this));
            input.addEventListener('input', this.updateSelectedShapeProperties.bind(this));
        });
    }

    setupFileHandling() {
        document.getElementById('saveBtn').addEventListener('click', this.saveProject.bind(this));
        document.getElementById('loadBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', this.loadProject.bind(this));
        document.getElementById('clearBtn').addEventListener('click', this.clearCanvas.bind(this));
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.selectedTool === 'select') {
            const clickedShape = this.getShapeAtPosition(x, y);
            if (clickedShape) {
                this.selectShape(clickedShape);
                this.isDragging = true;
                this.dragOffset = {
                    x: x - clickedShape.x,
                    y: y - clickedShape.y
                };
            } else {
                this.deselectAll();
            }
        } else if (['rectangle', 'circle', 'diamond', 'ellipse'].includes(this.selectedTool)) {
            this.createShape(this.selectedTool, x, y);
        } else if (this.selectedTool === 'arrow' || this.selectedTool === 'line') {
            this.startConnection(x, y);
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.isDragging && this.selectedShape) {
            this.selectedShape.x = x - this.dragOffset.x;
            this.selectedShape.y = y - this.dragOffset.y;
            this.updateShapeElement(this.selectedShape);
        }
    }

    handleMouseUp(e) {
        this.isDragging = false;
        this.isResizing = false;
    }

    handleContextMenu(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const clickedShape = this.getShapeAtPosition(x, y);
        if (clickedShape) {
            this.showContextMenu(e.clientX, e.clientY, clickedShape);
        }
    }

    handleDocumentClick(e) {
        if (!e.target.closest('.context-menu')) {
            this.hideContextMenu();
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Delete' && this.selectedShape) {
            this.deleteShape(this.selectedShape);
        }
    }

    createShape(type, x, y) {
        const shape = {
            id: `shape_${++this.shapeCounter}`,
            type: type,
            x: x - 50,
            y: y - 25,
            width: 100,
            height: 50,
            fillColor: document.getElementById('fillColor').value,
            borderColor: document.getElementById('borderColor').value,
            borderWidth: document.getElementById('borderWidth').value,
            text: 'New Shape'
        };

        this.shapes.push(shape);
        this.renderShape(shape);
        this.selectShape(shape);
    }

    renderShape(shape) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'shape');
        group.setAttribute('data-id', shape.id);

        let shapeElement;
        
        switch (shape.type) {
            case 'rectangle':
                shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                shapeElement.setAttribute('x', shape.x);
                shapeElement.setAttribute('y', shape.y);
                shapeElement.setAttribute('width', shape.width);
                shapeElement.setAttribute('height', shape.height);
                break;
                
            case 'circle':
                shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                shapeElement.setAttribute('cx', shape.x + shape.width / 2);
                shapeElement.setAttribute('cy', shape.y + shape.height / 2);
                shapeElement.setAttribute('r', Math.min(shape.width, shape.height) / 2);
                break;
                
            case 'diamond':
                shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const points = [
                    `${shape.x + shape.width / 2},${shape.y}`,
                    `${shape.x + shape.width},${shape.y + shape.height / 2}`,
                    `${shape.x + shape.width / 2},${shape.y + shape.height}`,
                    `${shape.x},${shape.y + shape.height / 2}`
                ].join(' ');
                shapeElement.setAttribute('points', points);
                break;
                
            case 'ellipse':
                shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                shapeElement.setAttribute('cx', shape.x + shape.width / 2);
                shapeElement.setAttribute('cy', shape.y + shape.height / 2);
                shapeElement.setAttribute('rx', shape.width / 2);
                shapeElement.setAttribute('ry', shape.height / 2);
                break;
        }

        shapeElement.setAttribute('fill', shape.fillColor);
        shapeElement.setAttribute('stroke', shape.borderColor);
        shapeElement.setAttribute('stroke-width', shape.borderWidth);

        // Add text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', shape.x + shape.width / 2);
        text.setAttribute('y', shape.y + shape.height / 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.setAttribute('font-size', '14');
        text.setAttribute('fill', '#333');
        text.textContent = shape.text;

        group.appendChild(shapeElement);
        group.appendChild(text);
        
        // Add connection points
        this.addConnectionPoints(group, shape);
        
        this.canvas.appendChild(group);
    }

    addConnectionPoints(group, shape) {
        const points = [
            { x: shape.x + shape.width / 2, y: shape.y }, // top
            { x: shape.x + shape.width, y: shape.y + shape.height / 2 }, // right
            { x: shape.x + shape.width / 2, y: shape.y + shape.height }, // bottom
            { x: shape.x, y: shape.y + shape.height / 2 } // left
        ];

        points.forEach((point, index) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('class', 'connection-point');
            circle.setAttribute('cx', point.x);
            circle.setAttribute('cy', point.y);
            circle.setAttribute('r', 4);
            circle.setAttribute('data-point', index);
            group.appendChild(circle);
        });
    }

    updateShapeElement(shape) {
        const group = this.canvas.querySelector(`[data-id="${shape.id}"]`);
        if (!group) return;

        const shapeElement = group.children[0];
        const textElement = group.children[1];

        switch (shape.type) {
            case 'rectangle':
                shapeElement.setAttribute('x', shape.x);
                shapeElement.setAttribute('y', shape.y);
                shapeElement.setAttribute('width', shape.width);
                shapeElement.setAttribute('height', shape.height);
                break;
                
            case 'circle':
                shapeElement.setAttribute('cx', shape.x + shape.width / 2);
                shapeElement.setAttribute('cy', shape.y + shape.height / 2);
                shapeElement.setAttribute('r', Math.min(shape.width, shape.height) / 2);
                break;
                
            case 'diamond':
                const points = [
                    `${shape.x + shape.width / 2},${shape.y}`,
                    `${shape.x + shape.width},${shape.y + shape.height / 2}`,
                    `${shape.x + shape.width / 2},${shape.y + shape.height}`,
                    `${shape.x},${shape.y + shape.height / 2}`
                ].join(' ');
                shapeElement.setAttribute('points', points);
                break;
                
            case 'ellipse':
                shapeElement.setAttribute('cx', shape.x + shape.width / 2);
                shapeElement.setAttribute('cy', shape.y + shape.height / 2);
                shapeElement.setAttribute('rx', shape.width / 2);
                shapeElement.setAttribute('ry', shape.height / 2);
                break;
        }

        // Update text position
        textElement.setAttribute('x', shape.x + shape.width / 2);
        textElement.setAttribute('y', shape.y + shape.height / 2);
        textElement.textContent = shape.text;

        // Update connection points
        const connectionPoints = group.querySelectorAll('.connection-point');
        const points = [
            { x: shape.x + shape.width / 2, y: shape.y },
            { x: shape.x + shape.width, y: shape.y + shape.height / 2 },
            { x: shape.x + shape.width / 2, y: shape.y + shape.height },
            { x: shape.x, y: shape.y + shape.height / 2 }
        ];

        connectionPoints.forEach((point, index) => {
            point.setAttribute('cx', points[index].x);
            point.setAttribute('cy', points[index].y);
        });

        // Update style properties
        shapeElement.setAttribute('fill', shape.fillColor);
        shapeElement.setAttribute('stroke', shape.borderColor);
        shapeElement.setAttribute('stroke-width', shape.borderWidth);
    }

    getShapeAtPosition(x, y) {
        return this.shapes.find(shape => {
            return x >= shape.x && x <= shape.x + shape.width &&
                   y >= shape.y && y <= shape.y + shape.height;
        });
    }

    selectShape(shape) {
        this.deselectAll();
        this.selectedShape = shape;
        const group = this.canvas.querySelector(`[data-id="${shape.id}"]`);
        group.classList.add('selected');
        
        // Update properties panel
        document.getElementById('fillColor').value = shape.fillColor;
        document.getElementById('borderColor').value = shape.borderColor;
        document.getElementById('borderWidth').value = shape.borderWidth;
        document.getElementById('borderWidthValue').textContent = shape.borderWidth;
        document.getElementById('shapeText').value = shape.text;
    }

    deselectAll() {
        this.selectedShape = null;
        document.querySelectorAll('.shape').forEach(shape => {
            shape.classList.remove('selected');
        });
    }

    updateSelectedShapeProperties() {
        if (!this.selectedShape) return;

        this.selectedShape.fillColor = document.getElementById('fillColor').value;
        this.selectedShape.borderColor = document.getElementById('borderColor').value;
        this.selectedShape.borderWidth = document.getElementById('borderWidth').value;
        this.selectedShape.text = document.getElementById('shapeText').value;

        this.updateShapeElement(this.selectedShape);
    }

    showContextMenu(x, y, shape) {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';

        // Setup context menu events
        document.getElementById('deleteItem').onclick = () => {
            this.deleteShape(shape);
            this.hideContextMenu();
        };

        document.getElementById('duplicateItem').onclick = () => {
            this.duplicateShape(shape);
            this.hideContextMenu();
        };
    }

    hideContextMenu() {
        document.getElementById('contextMenu').style.display = 'none';
    }

    deleteShape(shape) {
        const index = this.shapes.indexOf(shape);
        if (index > -1) {
            this.shapes.splice(index, 1);
            const group = this.canvas.querySelector(`[data-id="${shape.id}"]`);
            if (group) {
                group.remove();
            }
            if (this.selectedShape === shape) {
                this.selectedShape = null;
            }
        }
    }

    duplicateShape(shape) {
        const newShape = {
            ...shape,
            id: `shape_${++this.shapeCounter}`,
            x: shape.x + 20,
            y: shape.y + 20
        };
        this.shapes.push(newShape);
        this.renderShape(newShape);
    }

    saveProject() {
        const project = {
            shapes: this.shapes,
            connections: this.connections
        };
        
        const dataStr = JSON.stringify(project, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'flowchart.json';
        link.click();
    }

    loadProject(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const project = JSON.parse(event.target.result);
                this.clearCanvas();
                
                this.shapes = project.shapes || [];
                this.connections = project.connections || [];
                
                this.shapes.forEach(shape => {
                    this.renderShape(shape);
                });
                
                // Update counter
                this.shapeCounter = Math.max(...this.shapes.map(s => 
                    parseInt(s.id.split('_')[1]) || 0
                ), 0);
                
            } catch (error) {
                alert('Error loading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    clearCanvas() {
        this.shapes = [];
        this.connections = [];
        this.selectedShape = null;
        this.shapeCounter = 0;
        
        // Remove all shapes from canvas
        this.canvas.querySelectorAll('.shape').forEach(shape => {
            shape.remove();
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new FlowchartMaker();
});
