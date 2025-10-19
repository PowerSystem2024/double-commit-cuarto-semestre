interface UserAvatarsGroupProps {
    users: { id: string; name: string; avatar: string; github: string }[];
    size?: number; // Tamaño opcional del avatar (px)
  }
  
  export const UserAvatarsGroup = ({
    users,
    size = 40,
  }: UserAvatarsGroupProps) => {
    const overlap = size / 2.5;
  
    return (
      <div className="flex items-center">
        {users.map((user, index) => (
          <a
            href={user.github}
            key={user.id}
            target="_blank"
            title={user.name}
            className="rounded-full border-2 border-blue-500 overflow-hidden shadow-sm transform transition-all duration-300 relative hover:z-50 hover:scale-110"
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -overlap,
             
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    );
  };
  