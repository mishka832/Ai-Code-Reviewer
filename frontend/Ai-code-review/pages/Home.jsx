import React, { useState } from "react";
import { Card } from "../components/Card";
import { CodeEditor } from "../components/CodeEditor";
import { ReviewResults } from "../components/ReviewResults";
import { Button } from "../components/Button";
import { toast } from "sonner";
import { Code2, Sparkles } from "lucide-react";

const Home = () => {
  const [code, setCode] = useState("");
  const [reviewResult, setReviewResult] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to review");
      return;
    }

    setIsReviewing(true);

    try {
      // Replace the mock call with actual API call
      const response = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If your API requires an API key, add it here:
          // "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to review code");
      }

      const data = await response.json();

      // Ensure the response has quality_score and feedback array
      if (!data.score || !Array.isArray(data.feedback)) {
        console.log("API response:", data);
        throw new Error("Invalid response format from API");
      }

      setReviewResult(data);
      toast.success("Code review completed!");
    } catch (error) {
      console.error("Review error:", error);
      toast.error("Failed to review code. Please try again.");
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              AI Code Reviewer
            </h1>
            <p className="text-sm text-muted-foreground">
              Get instant feedback on your code quality
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Input */}
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 border border-border shadow-lg space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Your Code</h2>
            <div className="text-sm text-muted-foreground">
              {code.length} characters
            </div>
          </div>

          <CodeEditor
            value={code}
            onChange={setCode}
            placeholder={`// Paste your code here for AI review
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`}
          />

          <Button
            onClick={handleReview}
            disabled={isReviewing || !code.trim()}
            className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground font-medium"
          >
            {isReviewing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analyzing Code...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Review My Code
              </div>
            )}
          </Button>
        </Card>

        {/* Results */}
        {reviewResult ? (
          <ReviewResults result={reviewResult} />
        ) : (
          <Card className="p-8 text-center border-dashed border-border bg-card/30 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <Code2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Ready for Review
              </h3>
              <p className="text-muted-foreground">
                Enter your code and click "Review My Code" to get AI-powered
                feedback and quality analysis.
              </p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Home;
