import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import QuickLinkItem from "./QuickLinkItem";
import mockUser from "@/mock/mockUser";

const QuickLinks = () => {
    return (
        <Card className="shadow-sm">

            <CardHeader>

                <CardTitle>
                    Quick Links
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-2">

                {/* <QuickLinkItem title="Saved Posts" />

                <QuickLinkItem title="My Projects" />

                <QuickLinkItem title="My Skills" />

                <QuickLinkItem title="Bookmarks" /> */}

                {
                    mockUser.quickLinks.map((item) => (
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