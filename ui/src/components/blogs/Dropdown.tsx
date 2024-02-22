import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { RxCaretDown } from "react-icons/rx";

interface DropdownProps {
  items: string[];
  handleSelectItem: (value: string) => void;
  selectedItem: string;
  placeholder: string;
  Icon: ReactElement;
}

const Dropdown: FC<DropdownProps> = ({
  items,
  handleSelectItem,
  selectedItem,
  placeholder,
  Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => {
    handleSelectItem(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="w-full md:w-[150px] relative">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm leading-5 text-gray-700 shadow-sm focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
      >
        <div className="flex items-center gap-1">
          {Icon}
          <span className="capitalize">{selectedItem || placeholder}</span>
        </div>
        <RxCaretDown
          className={`h-4 w-4 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {items.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer capitalize truncate"
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
