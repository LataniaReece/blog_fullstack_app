import { FC, useEffect, useRef, useState } from "react";

interface UsersDropdownProps {
  users:
    | {
        username: string;
      }[]
    | undefined;
  handleSelectUser: (user: string) => void;
  searchParamsQuery: {
    category: string;
    authorName: string;
    keyword: string;
  };
}

const UsersDropdown: FC<UsersDropdownProps> = ({
  users,
  handleSelectUser,
  searchParamsQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (user: string) => {
    handleSelectUser(user);
    setSearchTerm(user);
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

  useEffect(() => {
    setSearchTerm(searchParamsQuery.authorName || "");
  }, [searchParamsQuery.authorName]);

  return (
    <div ref={dropdownRef} className="relative mt-3 flex items-center gap-2">
      <p>Search By User: </p>
      <div>
        <input
          type="text"
          readOnly
          placeholder="Search by user"
          className="w-[200px] px-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isOpen && (
          <ul className="absolute w-[200px] z-10 py-2 mt-1 bg-white rounded shadow-lg max-h-60 overflow-auto">
            {users &&
              users.map((user) => (
                <li
                  key={user.username}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer capitalize"
                  onClick={() => handleClick(user.username)}
                >
                  {user.username}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersDropdown;
