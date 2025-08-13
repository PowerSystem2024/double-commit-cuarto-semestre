from colorama import Style, Fore

class Usuario:
    def __init__(self, username: str, password: str, id_usuario: int = None):
        self._id_usuario = id_usuario
        self._username = username
        self._password = password
        
    @property
    def id_usuario(self):
        return self._id_usuario
    
    @property
    def username(self):
        return self.username
    
    @username.setter
    def username(self, username):
        self._username = username
        
    @property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, password):
        self._password = password
        
    def __str__(self):
        return f"""{Fore.GREEN}{Style.BRIGHT}
    ID: {self._id_usuario}
    Usuario: {self._username}{Style.RESET_ALL}
    """