"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: "OhmiclyLearn",
    site_description:
      "Free tools and resources for electrical engineers in Bangladesh RMG factories.",
    contact_email: "hello@ohmiclylearn.com",
    contact_phone: "+880 1XXX-XXXXXX",
    facebook_url: "https://facebook.com/ohmiclylearn",
    youtube_url: "https://youtube.com/@ohmiclylearn",
    linkedin_url: "https://linkedin.com/company/ohmiclylearn",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings((prev) => ({ ...prev, ...data }));
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-slate-500 font-bn">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 font-bn">
          Settings
        </h1>
        <p className="text-slate-500 font-bn text-sm mt-1">
          Manage site-wide settings
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* General */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-bn">
            General
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) =>
                setSettings({ ...settings, site_name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Site Description
            </label>
            <textarea
              value={settings.site_description}
              onChange={(e) =>
                setSettings({ ...settings, site_description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-bn">
            Contact Info
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Email
            </label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) =>
                setSettings({ ...settings, contact_email: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Phone
            </label>
            <input
              type="text"
              value={settings.contact_phone}
              onChange={(e) =>
                setSettings({ ...settings, contact_phone: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 font-bn">
            Social Links
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={settings.facebook_url}
              onChange={(e) =>
                setSettings({ ...settings, facebook_url: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              YouTube
            </label>
            <input
              type="url"
              value={settings.youtube_url}
              onChange={(e) =>
                setSettings({ ...settings, youtube_url: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={settings.linkedin_url}
              onChange={(e) =>
                setSettings({ ...settings, linkedin_url: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && (
            <span className="text-sm text-brand-green font-bn">
              Settings saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
