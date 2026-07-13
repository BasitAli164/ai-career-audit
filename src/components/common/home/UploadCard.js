"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    FileText,
    Github,
    Globe
} from "lucide-react";

export default function UploadCard() {

    return (

        <div
            id="upload"
            className="glass rounded-3xl p-8 shadow-xl"
        >

            <h2 className="mb-8 text-2xl font-bold">

                Analyze Your Profile

            </h2>

            <div className="space-y-5">

                <div>

                    <label className="mb-2 flex items-center gap-2">

                        <FileText size={18} />

                        Resume

                    </label>

                    <Input type="file" />

                </div>

                <div>

                    <label className="mb-2 flex items-center gap-2">

                        <Github size={18} />

                        GitHub URL

                    </label>

                    <Input placeholder="https://github.com/username" />

                </div>

                <div>

                    <label className="mb-2 flex items-center gap-2">

                        <Globe size={18} />

                        Portfolio

                    </label>

                    <Input placeholder="https://yourportfolio.com" />

                </div>

                <div>

                    <label className="mb-2">

                        Target Job Role

                    </label>

                    <Input placeholder="AI Engineer" />

                </div>

                <Button
                    className="gradient-bg mt-4 w-full py-6 text-lg"
                >

                    Analyze Profile

                </Button>

            </div>

        </div>

    );

}