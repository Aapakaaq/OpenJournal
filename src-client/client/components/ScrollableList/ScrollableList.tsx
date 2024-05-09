import { useEffect, useRef } from 'react';
import "./ScrollableList.css"
interface IProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  // @ts-ignore
  onDelete: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

/// Scrolls to the bottom of the collection when new items are added
export default function ScrollableList<T>({items, renderItem, onDelete}: IProps<T> ){
  const collectionRef = useRef<HTMLDivElement>(null);
  const prevItemCount = useRef<number>(0);

  useEffect(() => {
    // Non-optimal solution but OK since list is rarely larger than 10 elements
    if (items.length > prevItemCount.current) {
      collectionRef.current.scrollTo({
        top: collectionRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    prevItemCount.current = items.length;
  }, [items]);

  return (
    <div className={"list-container"} ref={collectionRef}>
      {items.map((item, index) => (
          <div className={"list-collection"} key={index}>
            <div className={"list-item"}>
            {renderItem(item, index)}
            </div>
            <div>
              <button onClick={(e) => onDelete(e, index)}>x</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}