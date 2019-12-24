# URL'S

## CLASSROOM RENDER URL'S

```
  classroom:

    DESCRIPTION: "Getting all classrooms"

    URL: admin/classrooms

    EXAMPLE: http://localhost:3000/admin/classrooms/

    GRAPHQL QUERY: 

```

```
  classroom detail:

    DESCRIPTION: "Getting classroom detail with using id"

    URL: admin/classrooms/:classroom_id

    EXAMPLE: http://localhost:3000/admin/classrooms/1/

    GRAPHQL QUERY: 

```

```
  section:

    DESCRIPTION: "Getting all sections inside the classroom"

    URL: admin/classrooms/:classroom_id/sections

    EXAMPLE: http://localhost:3000/admin/classrooms/1/sections/

    GRAPHQL QUERY: 

```

```
  section detail:

    DESCRIPTION: "Getting section details inside the classroom using  classroom id and section id"

    URL: admin/classrooms/:classroom_id/sections/:section_id

    EXAMPLE: http://localhost:3000/admin/classrooms/1/sections/1/

    GRAPHQL QUERY: 

```

```
  block:

    DESCRIPTION: "Getting all blocks inside the section"

    URL: admin/classrooms/:classroom_id/sections/:section_id/blocks/

    EXAMPLE: http://localhost:3000/admin/classrooms/1/sections/1/blocks/

    GRAPHQL QUERY: 

```

```
  block detail:

    DESCRIPTION: "Getting block detail inside the classroom and section usinf section id and classroom id"

    URL: admin/classrooms/:classroom_id/sections/:section_id/blocks/1/

    EXAMPLE: http://localhost:3000/admin/classrooms/1/sections/1/blocks/1/

    GRAPHQL QUERY: 

```
