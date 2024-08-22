document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('puzzle-container');
    let tiles = Array.from(container.querySelectorAll('.tile'));
    const message = document.getElementById('message');

    // 随机排列拼图块
    function shuffleTiles() {
        tiles.sort(() => Math.random() - 0.5);
        tiles.forEach(tile => container.appendChild(tile));
    }

    shuffleTiles();

    // 更新 tiles 数组
    function updateTiles() {
        tiles = Array.from(container.querySelectorAll('.tile'));
    }

    // 实现拖拽交换
    let draggedTile = null;

    container.addEventListener('dragstart', function(event) {
        if (event.target.classList.contains('tile')) {
            draggedTile = event.target;
            console.log('Dragging:', draggedTile.textContent); // 调试输出
        }
    });

    container.addEventListener('dragover', function(event) {
        if (event.target.classList.contains('tile')) {
            event.preventDefault();
        }
    });

    container.addEventListener('drop', function(event) {
        event.preventDefault();
        if (draggedTile && event.target.classList.contains('tile') && draggedTile !== event.target) {
            const targetTile = event.target;

            console.log('Dropping:', targetTile.textContent); // 调试输出

            // 更新 DOM 中的拼图块位置
            container.insertBefore(draggedTile, targetTile);
            container.insertBefore(targetTile, draggedTile.nextSibling);

            updateTiles(); // 重新获取 tiles 数组

            checkWin();
        }
    });

    // 检查拼图是否完成
    function checkWin() {
        const currentOrder = tiles.map(tile => tile.textContent).join('');
        console.log('Current Order:', currentOrder); // 调试输出
        if (currentOrder === '123456789') {
            message.textContent = '拼图完成';
        } else {
            message.textContent = '';
        }
    }
});
