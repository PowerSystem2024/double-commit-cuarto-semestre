interface UserProps {
  message: string;
  user: {
    user_id: number;
    user_name: string;
    user_email: string;
    user_update: boolean;
    created_at: Date | string;
    user_password: string;
    user_avatar: string;
    updated_at: Date | string;
  };
}

interface TasksPageProps {
  message: string;
  tareas: {
    tarea_id: number;
    titulo: string;
    descripcion: string;
    actualizado: boolean;
    creado_el: Date | string;
  }[];
  deleteTask: (id: number) => void;
}

type PartialUserProps = Partial<UserProps>;
type PartialTasksProps = Partial<TasksPageProps>;

export { PartialUserProps, PartialTasksProps, UserProps, TasksPageProps };
