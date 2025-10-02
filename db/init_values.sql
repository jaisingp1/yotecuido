-- Insert initial data into the services table
INSERT INTO
    services (name, category, description)
VALUES
    (
        'Niñera por horas',
        'ninos',
        'Cuidado de niños por un número específico de horas.'
    ),
    (
        'Cuidado nocturno',
        'ninos',
        'Cuidado de niños durante la noche.'
    ),
    (
        'Apoyo con tareas',
        'ninos',
        'Ayuda con las tareas escolares y actividades educativas.'
    ),
    (
        'Transporte escolar',
        'ninos',
        'Llevar y recoger a los niños del colegio.'
    ),
    (
        'Actividades recreativas',
        'ninos',
        'Organización de juegos y actividades para entretener a los niños.'
    ),
    (
        'Paseo de perros',
        'mascotas',
        'Paseos regulares para perros, adaptados a sus necesidades de ejercicio.'
    ),
    (
        'Cuidado en casa del cuidador',
        'mascotas',
        'Alojamiento de mascotas en el domicilio del cuidador.'
    ),
    (
        'Cuidado en casa del dueño',
        'mascotas',
        'Cuidado de mascotas en el propio hogar del cliente.'
    ),
    (
        'Visitas diarias',
        'mascotas',
        'Visitas a domicilio para alimentar y atender a las mascotas.'
    ),
    (
        'Guardería de día',
        'mascotas',
        'Cuidado de mascotas durante el día en un entorno seguro y social.'
    ),
    (
        'Administración de medicamentos',
        'mascotas',
        'Administración de medicamentos a mascotas según prescripción veterinaria.'
    ),
    (
        'Compañía diurna',
        'mayores',
        'Acompañamiento y conversación para adultos mayores durante el día.'
    ),
    (
        'Compañía nocturna',
        'mayores',
        'Acompañamiento y asistencia para adultos mayores durante la noche.'
    ),
    (
        'Ayuda con movilidad',
        'mayores',
        'Asistencia para caminar, levantarse y moverse.'
    ),
    (
        'Preparación de alimentos',
        'mayores',
        'Cocina de comidas nutritivas y adaptadas a las necesidades del adulto mayor.'
    ),
    (
        'Recordatorio de medicamentos',
        'mayores',
        'Asegurarse de que el adulto mayor tome sus medicamentos a tiempo.'
    ),
    (
        'Acompañamiento a citas médicas',
        'mayores',
        'Transporte y acompañamiento a consultas y exámenes médicos.'
    );

-- Insert initial data into the badges table
INSERT INTO
    badges (name, description)
VALUES
    (
        'Elite',
        'Cuidadores con las más altas calificaciones y excelente historial.'
    ),
    (
        'Verificado Plus',
        'Cuidadores que han completado una verificación de antecedentes exhaustiva.'
    ),
    (
        'Respuesta Rápida',
        'Cuidadores que responden a las solicitudes en menos de una hora.'
    ),
    (
        'Favorito',
        'Cuidadores que son frecuentemente guardados como favoritos por los clientes.'
    ),
    (
        'Certificado',
        'Cuidadores con certificaciones profesionales en su área.'
    );