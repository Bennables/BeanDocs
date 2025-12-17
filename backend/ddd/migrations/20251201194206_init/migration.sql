-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "docs" (
    "id" SERIAL NOT NULL,
    "ownerid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "text" JSONB NOT NULL,

    CONSTRAINT "docs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "docs" ADD CONSTRAINT "docs_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
