import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const PostInput = ({ onCreatePost }) => {
    //to track input;
    const [inputData, setInputData] = useState("");

    const handleOnChange = (event) => {
        setInputData(event.target.value);
    }

    const handleButtonClick = () => {
        //no empty is accepted
        if (!inputData.trim()) return;

        onCreatePost(inputData.trim()); //so, using .trim() we can remove un-necessary white space, "      Hello React      " => "Hello React";

        //empty textArea;
        setInputData("");
    }

    return (
        <div className="space-y-4">

            <Textarea
                placeholder="Share an update with the developer community..."
                className="min-h-28 resize-none"
                value={inputData}
                onChange={handleOnChange}
            />

            <div className="flex justify-end">

                <Button
                    onClick={handleButtonClick}
                    disabled={!inputData.trim()} //Button remains disabled until user enters some meaningful text.
                >
                    Publish
                </Button>

            </div>

        </div>
    );
};

export default PostInput;