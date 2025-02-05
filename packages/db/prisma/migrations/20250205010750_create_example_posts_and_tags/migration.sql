-- CreateTable
CREATE TABLE "ExamplePost" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamplePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExampleTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExamplePostToExampleTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExamplePostToExampleTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExamplePostToExampleTag_B_index" ON "_ExamplePostToExampleTag"("B");

-- AddForeignKey
ALTER TABLE "_ExamplePostToExampleTag" ADD CONSTRAINT "_ExamplePostToExampleTag_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamplePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamplePostToExampleTag" ADD CONSTRAINT "_ExamplePostToExampleTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ExampleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
