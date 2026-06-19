import { Suspense } from "react";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import { getAllBooks } from "@/lib/actions/book.actions";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  const bookResults = await getAllBooks(q);
  const books = bookResults.success ? bookResults.data ?? [] : [];

  return (
    <main className="wrapper container">
      <Hero />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-(--text-primary)">
          Recent Books
        </h2>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <div className="library-books-grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            title={book.title}
            author={book.author}
            coverURL={book.coverURL}
            slug={book.slug}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
