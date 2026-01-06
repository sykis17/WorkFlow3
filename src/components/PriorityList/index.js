import React, {useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableItem} from './SortableItem';
import styles from './styles.module.css';

export default function PriorityList() {
  const [items, setItems] = useState([
    '1. Tee hätäilmoitus (Mayday)',
    '2. Pue pelastusliivit',
    '3. Laske pelastusveneet',
    '4. Kerää välttämättömät varusteet (vesi, lääkkeet)',
    '5. Siirry kokoontumisasemalle'
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className={styles.container}>
      <h3>Järjestä toimenpiteet tärkeysjärjestykseen:</h3>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(id => <SortableItem key={id} id={id} />)}
        </SortableContext>
      </DndContext>
      <p className={styles.hint}>💡 Vedä rivejä hiirellä vaihtaaksesi järjestystä.</p>
    </div>
  );
}