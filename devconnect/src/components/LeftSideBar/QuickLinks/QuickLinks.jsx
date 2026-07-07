import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import QuickLinkItem from "./QuickLinkItem";
import mockUsers from "@/mock/mockUser";

const QuickLinks = () => {
    return (
        <Card className="shadow-sm">

            <CardHeader>

                <CardTitle>
                    Quick Links
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-2">

                {
                    mockUsers[1].quickLinks.map((item) => (
                        <QuickLinkItem
                            key={item.id}
                            item={item}
                        />
                    ))
                }

            </CardContent>

        </Card>
    );
};

export default QuickLinks;